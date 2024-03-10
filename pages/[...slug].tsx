import { getStoryblokApi } from "@storyblok/react";

import StoryblokProvider from "@/source/lib/StoryblokProvider";
import StoryblokStory from "@storyblok/react/story";


const Page = ({story}:any) => {

    console.log(`children -- ${story?.content?.body}`)
    return (
      <div>
      <StoryblokStory story={story} />
    </div>
      )
};

export default Page;
 
export async function getStaticPaths() {

    let sbParams = {};

    if (process.env.NODE_ENV === "production") {
        sbParams = { version: "published" };
    } else {
        sbParams = { version: "draft" };
    }

    

    const storyblokApi = getStoryblokApi();
    const {data} = await storyblokApi.get("cdn/links/",sbParams);
    const paths: { params: { slug: any[]; }; }[] = [];
    
    const links = data?.links ??[];
    Object.keys(links).forEach(key => {

        if (links[key]?.is_folder) {
            return;
        }
        const slug = links[key].slug;
        let splitSlug = slug?.split("/");
        paths.push({ params: {slug: splitSlug}});
        
    });

    return {
        paths: paths,
        fallback: true,
    }
}

export async function getStaticProps({params}:any) { 

    let slug = params.slug ? params.slug.join("/") : "home";
    console.log(`Slug -- ${slug}`)
    const storyblokApi = getStoryblokApi();
    const sbParams:any = {
      version: "draft", // or published
      cv:Date.now()
    };
   
    
   
    let { data } = await storyblokApi.get(`cdn/stories/${slug}`,sbParams);
   
    return {
      props: {
        story: data ? data.story : null,
      },
      revalidate: 3600, // revalidate every hour
    };
    
}