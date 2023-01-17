import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const database_id = process.env.NOTION_DATABASE_ID!;

type NotionErrorLog = {
  title: string;
  statusCode: number;
  apiURL: string;
  description: string;
  stackTrace: any;
};

export async function logError({ title, apiURL, statusCode, description, stackTrace }: NotionErrorLog) {
  const page = await notion.pages.create({
    parent: { database_id, type: "database_id" },

    //This is the properties of a page
    properties: {
      Name: { title: [{ type: "text", text: { content: title } }] },
      Page: { type: "rich_text", rich_text: [{ type: "text", text: { content: apiURL } }] },
      "Status code": { type: "number", number: statusCode }
    }
  });

  return await notion.blocks.children.append({
    block_id: page.id,
    children: [
      {
        type: "heading_1",
        object: "block",
        heading_1: { rich_text: [{ type: "text", text: { content: "Description" } }] }
      },
      {
        type: "paragraph",
        object: "block",
        paragraph: { rich_text: [{ text: { content: description } }] }
      },
      {
        type: "heading_2",
        object: "block",
        heading_2: { rich_text: [{ type: "text", text: { content: "Stack trace" } }] }
      },
      {
        type: "paragraph",
        paragraph: { rich_text: [{ type: "text", text: { content: stackTrace } }] }
      }
    ]
  });
}
