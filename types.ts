
export interface Post {
  id: string;
  title: string;
  slug: string;
  content_html: string;
  image_url?: string;
  image_prompt?: string;
  category: string;
  references_html?: string;
  created_at: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Subscription {
  email: string;
  frequency: 'diaria' | 'semanal';
}
