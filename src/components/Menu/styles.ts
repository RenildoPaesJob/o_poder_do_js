import styled from "styled-components/native";

export const ProductContainer = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
`

export const ProductImage = styled.Image`
	width: 120px;
	height: 96px;
	border-radius: 8px;
`

export const ProductDetails = styled.View`
	margin-left: 16px;
	flex: 1;
`

export const Separator = styled.View`
	width: 100%;
	height: 1px;
	background: #ddd;
	margin: 24px 0px;
`

export const AddToCardButton = styled.TouchableOpacity`
	position: absolute;
	bottom: 0;
	right: 0;
`