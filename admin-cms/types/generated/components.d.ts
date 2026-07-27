import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectMilestone extends Struct.ComponentSchema {
  collectionName: 'components_project_milestones_v2';
  info: {
    displayName: 'Milestone';
    icon: 'calendar';
  };
  attributes: {
    date: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    done: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_project_testimonials_v2';
  info: {
    displayName: 'Testimonial';
    icon: 'quote';
  };
  attributes: {
    avatar: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProjectUpdate extends Struct.ComponentSchema {
  collectionName: 'components_project_updates_v2';
  info: {
    displayName: 'Update';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    date: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBudgetItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_budget_items';
  info: {
    displayName: 'Budget Item';
    icon: 'chartPie';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#2563eb'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    percentage: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTextItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_items';
  info: {
    displayName: 'Text Item';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.milestone': ProjectMilestone;
      'project.testimonial': ProjectTestimonial;
      'project.update': ProjectUpdate;
      'shared.budget-item': SharedBudgetItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.text-item': SharedTextItem;
    }
  }
}
