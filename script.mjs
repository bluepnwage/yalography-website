import fs from "fs/promises";
const p = `Yalography offers a range of services to enhance your brand image through professional photography. Our team
is comprised of experienced photographers, MUAs and Hair dressers that can capture stunning images that
showcase your products, services, and brand story. We understand the importance of visual content in today's
digital age and how it can impact the success of your business. From product photography to lifestyle and
event photography, we have the skills and expertise to create high-quality, engaging content that will help
your brand stand out. With Yalography's services, you can be sure that your brand image will be elevated to
new heights and leave a lasting impression on your audience.`;

await fs.writeFile("text.txt", p.replace(/'/gi, "&apos;"));
