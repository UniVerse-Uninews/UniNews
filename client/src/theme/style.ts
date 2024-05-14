import styled from "styled-components/native";
export const Container = styled.View`
    background: ${props=> props.theme.background};
    color: ${props=> props.theme.text};
    flex: 1;
`;
export const NameLogoBlue = styled.Text`
    color: ${props=> props.theme.primary};
`;

