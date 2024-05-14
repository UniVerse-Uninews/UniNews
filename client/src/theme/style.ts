import styled from "styled-components/native";
export const Container = styled.View`
    background: ${props=> props.theme.background};
    flex: 1;
`;
export const Name = styled.Text`
    color: ${props=> props.theme.text};
`;

export const Email = styled.Text`
    color: ${props=> props.theme.text};
`;
