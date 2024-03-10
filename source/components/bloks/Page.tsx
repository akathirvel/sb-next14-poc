import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";

const Page = ({ blok }:any) => (
  <main {...storyblokEditable(blok)} className="text-center mt-4">
    {blok?.body?.map((nestedBlok:any) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;