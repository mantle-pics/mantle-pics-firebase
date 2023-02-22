# MantlePicsWeb https://mantle.pics

The goal of MantlePics is to make the web3 experience better and safer. Our project is a combination of two main improvements of the mantle User experience

### Explanation Video: https://youtu.be/39MV06afapo

## Profile Image Generation

#### INTRO:
One of the biggest challenges in using cryptocurrency is the issue of user experience when dealing with wallet addresses. Wallet addresses can be difficult to remember, easy to mistype, and are prone to errors that can lead to lost funds.

This is where our project comes in - by generating unique images for each wallet address, we can make the process of transacting and storing cryptocurrency more user-friendly, secure, and enjoyable.

With our image generation algorithm, we can provide a stable and highly-diffused representation of wallet addresses that is easy to recognize and remember. 

By providing a more intuitive and visually-appealing way to interact with cryptocurrency, we hope to encourage wider adoption and usage of this technology. 

Our project is just the beginning of a new era in cryptocurrency UX, and we are excited to be at the forefront of this revolution.

#### FUNCTIONALITY:

- Generating unique images for a wallet or contract address 
- Image is generated using stable diffusion
- every time you generate an image with our api the same image is returned because we use the address to build the prompt and the seed for stable diffusion


## User Friendly transaction feed

INTRO:
Gone are the days of scrolling through endless tables of transaction data or trying to decipher complicated graphs and charts. With our project, you can quickly and easily see the most important information about each transaction, including sender, receiver, and amount.

With mantle.pics you are able to get a really fast overview of a wallets activity.  
The Image Generation helps, cause its a lot easier to remember images than wallet addresses.

Our TikTok-style feed offers a fun and interactive way to stay up-to-date with the latest activity on the Matic blockchain. Whether you're a seasoned blockchain enthusiast or a newcomer to the technology, you'll find our feed to be an engaging and informative way to learn more about this exciting field.

- Easy TikTok like transaction feed to scroll through
- Overview of the most important information about a single transaction

### Notice:
The transaction feed is currently limited to transactions and does not cover token transfers. The functionality of it is implemented but deactivated as of an error in the mantle explorer api which prevents using the paging mechanism. Enabling the feature works but slows the application down that it becomes nearly unusable.



## Frontend project: https://github.com/mantle-pics/mantle-pics-web


# Development

## Prerequisites
- Node >= 18
- [Firebase CLI](https://firebase.google.com/docs/cli)

## Steps before you start
1. Run `npm install` in the `functions` directory of the project.
2. Install [Firebase CLI](https://firebase.google.com/docs/cli)

## Initialize firebase project

1. Create a new firebase project using the [firebase console](https://console.firebase.google.com/).
2. Upgrade project to use the blaze plan. Otherwise deployment of functions will fail
3. In the firebase console click on `Storage` in the development tab and click create and select a region
4. To allow link creation later on go to [Service accounts in Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts)
5. Click on `your-project-id@appspot.gserviceaccount.com`
6. Click on `Permissions` and hit the edit button next to `your-project-id@appspot.gserviceaccount.com`
7. Click add another role and select `Service Account Token Creator`
8. Click `Save`
9. Go back to the terminal in the root of this directory and set firebase CLI to use your generated project`firebase use your-project-name`.
10. Go to [replicate.com](https://replicate.com/) and create an account there.
11. Next open your [account](https://replicate.com/account) and copy yur api key
12. Rename `.env.sample` to `.env` in the `functions` directory and insert your api key into
13. Now you are ready to serve or deploy your project


## Development server

Run `npm run serve` for a dev server. The URL for calling the API will be shown in the console

*Notice:* The dev server does not have access to the default google service account which may lead to errors when trying to save anything in google cloud storage

## Deploy

Run `npm run deploy` to upload the project to firebase hosting


## Questions?

Feel free to reach out to us via email to [hello@mantle.pics](mailto:hello@mantle.pics)
