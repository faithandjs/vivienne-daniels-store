// import { navigate } from "gatsby-link"
// import React from "react"
// import styled from "styled-components"

// import Layout from "../components/layout"
// import PrimaryButton from "../components/PrimaryButton"
// import useStore from "../context/StoreContext"
// import useInput from "../utils/useInput"

// const ProductTemplate = ({ pageContext }) => {
//   const { product } = pageContext
//   const { addVariantToCart } = useStore()
//   const bind = useInput(1)

//   return (
//     <Layout>
//       <BackButton onClick={() => navigate(-1)}>{"< "} Back</BackButton>
//       <Wrapper>
//         <Image src={product.images[0]?.src} />
//         <InfoContainer>
//           <Title>{product.title}</Title>
//           <Subtitle>{product.priceRangeV2.maxVariantPrice.amount}0$</Subtitle>
//           <p>{product.description}</p>
//           <InputForm>
//             <Subtitle><label htmlFor="qty">Quantity:</label></Subtitle>
//             <Input placeholder="1" id="qty" type="number" {...bind} />
//           </InputForm>
//           <PrimaryButton text="Add to cart" onClick={() => addVariantToCart(product, bind.value)} />
//         </InfoContainer>
//       </Wrapper>
//     </Layout>
//   )
// }

// export default ProductTemplate