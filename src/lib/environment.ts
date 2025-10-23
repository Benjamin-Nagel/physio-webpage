
export function getPageUrl() {
    return process.env.PAGE_URL;
}

export function getWordpressApiUrl() {
    return process.env.WORDPRESS_API_URL;
}

export function getGitHubWorkflowBuild() {
    return process.env.WORKFLOW_BUILD
}

export function getGoogleMapsApiKey() {
    return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
}

export function getNodeEnv() {
    return process.env.NODE_ENV
}

export function getCmsMode() {
    return process.env.NEXT_PUBLIC_CMS_MODE
}