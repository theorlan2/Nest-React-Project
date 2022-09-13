import styled from "styled-components";
import InputSearch from "./InputSearch"; 

const Header = styled.header`
display: flex;
width: 100%;
justify-content: space-between;
border-bottom: 1px solid #eee;
padding:10px;
`;

const HeaderLogo = styled.header`
display: flex;
width:50px;
margin:10px;
`;
const ContButton = styled.div`
display: flex;
width:50px;
margin:10px;
`;




const HeaderTop = () => (
  <Header>
    <HeaderLogo />
    <InputSearch />
    <ContButton />

  </Header>
);
export default HeaderTop;