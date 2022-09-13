import styled from "styled-components";

const ContInputSearch = styled.div`
border: 1px solid #eee;
max-width:320px;
`;
const Input = styled.input`
padding:10px
`;

const InputSearch = () => (
    <ContInputSearch>
        <Input />
    </ContInputSearch>
);


export default InputSearch;