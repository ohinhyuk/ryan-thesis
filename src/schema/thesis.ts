export interface PublicationDatabase {
  object: string;
  id: string;
  cover: null;
  icon: {
    type: string;
    emoji: string;
  };
  created_time: string;
  created_by: User;
  last_edited_by: User;
  last_edited_time: string;
  title: TextContent[];
  description: any[];
  is_inline: boolean;
  properties: {
    [key: string]: DatabaseProperty;
  };
  parent: {
    type: string;
    page_id: string;
  };
  url: string;
  public_url: string;
  archived: boolean;
  developer_survey: string;
  request_id: string;
}

interface User {
  object: string;
  id: string;
}

interface TextContent {
  type: string;
  text: {
    content: string;
    link: null | string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: null | string;
}

interface DatabaseProperty {
  id: string;
  name: string;
  type: string;
  [property: string]: any; // This can be expanded based on specific types e.g., formula, files, number, rich_text, checkbox, select, etc.
}
