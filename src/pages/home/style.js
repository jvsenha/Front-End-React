import styled, { css } from 'styled-components'

export const Container = styled.div`
width: 80%;
height: 80%;
flex-shrink: 0;
background: #FFF;
box-shadow: 0px 0px 11px 0px rgba(0, 0, 0, 0.25);

`;

export const Content = styled.div`
width: 50%;
height: 100%;
background: #FFF;
float: left;
display: flex;
align-items: center;
justify-content: center;
${props => props.$dark && css`
    background: rgba(0, 0, 0, 0.89);
      color: white;
      float: right;
    `};
`;

export const Main_content = styled.div`
width: 300px;
position: relative;
margin: 10% 10%;
`;

export const FormLogin = styled.form`
margin-bottom: 3em;
`;