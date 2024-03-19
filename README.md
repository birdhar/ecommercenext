
# EMart | Ecommerce Application

EMart is a modern eCommerce platform built using Next.js, offering a seamless shopping experience for users. The platform features a user-friendly interface with intuitive navigation and robust functionality to meet the needs of both buyers and sellers.With distinct client and admin panels, it offers tailored functionalities to meet the needs of each user type.

## Key Features:

**Homepage:**  The homepage showcases featured products through a dynamic carousel and highlights top-rated products to attract users' attention.

![App Screenshot](https://ik.imagekit.io/birat22/Screenshot%20(1717).png)



**Products Catalog:** Extensive catalog showcasing diverse products with detailed descriptions and images. Each product has its dedicated page where users can view detailed information, including images, descriptions, prices, and ratings.

![App Screenshot](https://ik.imagekit.io/birat22/Screenshot%20(1718).png)



**Shopping Cart:**  The cart section is powered by Redux, providing users with a seamless and interactive shopping experience. Users can add products to their cart, update quantities, and remove items as needed.

![App Screenshot](https://ik.imagekit.io/birat22/Screenshot%20(1720).png)

**Secure Checkout** The checkout process is divided into multiple steps, including address entry, order increment, decrement, and removal and then proceed to payment. The payment processing is enabled through integration with the Stripe payment gateway. Users can securely complete their transactions using cards.Upon completing a purchase, users are redirected to an order response page, where they receive status updates indicating whether their order was successfully placed or if there were any payment issues.

![App Screenshot](https://ik.imagekit.io/birat22/Screenshot%20(1722).png)

**Profile and Order History**  Users have access to a dedicated account section where they can view and edit their personal information. The order history page provides users with a comprehensive overview of their past orders, allowing them to track their purchases and reorder items easily.

![App Screenshot](https://ik.imagekit.io/birat22/Screenshot%20(1721).png)


## Tech Stack

NextJs, React, Redux, TailwindCSS, Material UI, MongoDB, NextAuth, Stripe


## Demo

https://ecommercenexttest.vercel.app/
https://ecommercenexttest.netlify.app/


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`

`GOOGLE_ID`

`GOOGLE_SECRET`

`NEXTAUTH_SECRET`

`SMTP_HOST`

`SMTP_PORT`

`SMTP_USER`

`SMTP_PASSWORD`

`EMAIL_FROM`

`APP_URL`

`NEXTAUTH_URL`

`STRIPE_SECRET_KEY`

`STRIPE_PUBLIC_KEY`


