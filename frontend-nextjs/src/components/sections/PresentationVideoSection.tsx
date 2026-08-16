interface PresentationVideo {
  title?: string;
  description?: string;
  videoUrl?: string;
  videoFile?: { url: string };
  active?: boolean;
}

async function getPresentationVideo(): Promise<PresentationVideo | null> {
  try {
    const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const response = await fetch(strapiUrl + "/api/presentation-video?populate[videoFile]=true");
    if (!response.ok) throw new Error("Strapi status " + response.status);
    const result = (await response.json()) as { data: PresentationVideo | null };
    return result?.data || null;
  } catch (error) {
    console.warn("[PresentationVideo] Erreur fetch", error);
    return null;
  }
}

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    return "https://www.youtube.com/embed/" + ytMatch[1];
  }
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    return "https://player.vimeo.com/video/" + vimeoMatch[1];
  }
  return null;
}

export default async function PresentationVideoSection() {
  const video = await getPresentationVideo();
  if (!video || video.active === false) return null;
  if (!video.videoFile?.url && !video.videoUrl) return null;

  const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const fileUrl = video.videoFile?.url
    ? video.videoFile.url.startsWith("http")
      ? video.videoFile.url
      : strapiUrl + video.videoFile.url
    : null;
  const embedUrl = !fileUrl && video.videoUrl ? getEmbedUrl(video.videoUrl) : null;

  return (
    <section className="py-16 bg-neutral-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {(video.title || video.description) && (
          <div className="text-center mb-10">
            {video.title && (
              <h2 className="font-heading font-bold text-white text-2xl md:text-3xl mb-3">{video.title}</h2>
            )}
            {video.description && (
              <p className="text-neutral-400 max-w-2xl mx-auto">{video.description}</p>
            )}
          </div>
        )}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
          {fileUrl ? (
            <video src={fileUrl} controls className="w-full h-full object-cover" preload="metadata" />
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={video.title || "Presentation Help Funds"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}