import sanityClient from "@sanity/client"

import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "l3dcxj94",
    dataset:"production",
    apiVersion:"2021-11-16",
    useCdn:true,
    token:"skcgQGcT4fJDrf1y9zJzxDjiugjhtm6sv3K5dMDuRKpVTk66qWIu7GqPO8AMSfTxof7oIqayVDJLoIMjF7kRcROnDccMx6PG8zxerjY355YVcPwflGHKMV5SSIWTgshxBkISPjHjRcl3YdaFECLriFykARFIl0pkPOFPxXA87jD1550QW7Fc"
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)