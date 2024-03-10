"use client";
import { apiPlugin, storyblokInit } from "@storyblok/react";
import components from "../components/comps";

/* *Storyblok Client initialization* */
storyblokInit({
    accessToken: process.env.TOKEN,
    use: [apiPlugin],
    components:components
})
/**
 * StoryblokProvider component.
 *
 * @param {any} children - The children to be rendered within the StoryblokProvider
 * @return {any} The children passed to the StoryblokProvider
 */
const StoryblokProvider = ({ children }: any) => {
    return children;
}

export default StoryblokProvider;