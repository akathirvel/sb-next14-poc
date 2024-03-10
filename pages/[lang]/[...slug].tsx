import { getStoryblokApi } from "@storyblok/react";

import StoryblokProvider from "@/source/lib/StoryblokProvider";


const Page = ({children}:any) => {

    console.log(children)
    return (
        <StoryblokProvider>
          <html lang="en">
            <body>{children}</body>
          </html>
        </StoryblokProvider>
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
    const paths: { params: { lang: any; slug: any; }; }[] = [];
    
    const links = data?.links ??[];
    Object.keys(links).forEach(key => {

        if (links[key]?.is_folder) {
            return;
        }
        const slug = links[key].slug;
        let splitSlug = slug?.split("/");
        paths.push({ params: { lang: splitSlug[0], slug: splitSlug.slice(1) }});
        
    });

    return {
        paths: paths,
        fallback: true,
    }
}

export async function getStaticProps({params}:any) { 

    let slug = params.slug ? params.slug.join("/") : "home";
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