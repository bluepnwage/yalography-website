import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const database_id = process.env.NOTION_DATABASE_ID!;
const message_database_id = process.env.NOTION_MESSAGE_DATABASE_ID!;

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
  await Promise.all([
    notion.comments.create({
      parent: { type: "page_id", page_id: page.id },
      rich_text: [
        {
          mention: { user: { type: "person", id: process.env.NOTION_USER_ID!, person: { email: "" } } },
          type: "mention"
        }
      ]
    }),
    notion.blocks.children.append({
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
    })
  ]);
}

export type FormProps = {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
  number: string;
};

export async function saveMessage(data: FormProps) {
  const fullName = `${data.first_name} ${data.last_name}`;
  const page = await notion.pages.create({
    parent: { type: "database_id", database_id: message_database_id },
    properties: {
      Name: { title: [{ type: "text", text: { content: fullName } }] },
      Email: { type: "email", email: data.email },
      Phone: { type: "phone_number", phone_number: data.number },
      Subject: { type: "rich_text", rich_text: [{ type: "text", text: { content: data.subject || "N/A" } }] }
    }
  });
  await notion.blocks.children.append({
    block_id: page.id,
    children: [
      {
        type: "heading_1",
        heading_1: { rich_text: [{ type: "text", text: { content: data.subject || "No subject" } }] }
      },
      {
        type: "paragraph",
        paragraph: { rich_text: [{ type: "text", text: { content: data.message } }] }
      }
    ]
  });
}
