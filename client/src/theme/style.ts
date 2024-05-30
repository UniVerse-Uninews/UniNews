import styled from "styled-components/native";
export const Container = styled.View`
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
`;
export const ScrollContainer = styled.ScrollView`
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    flex: 1;
`;
export const Name = styled.Text`
    color: ${props => props.theme.primary};
`;
export const NameBlue = styled.Text`
    color: ${props => props.theme.blue};
`;
export const Line = styled.View`
    border-color: ${props => props.theme.blue};
`;
export const BorderColorContainer = styled.View`
    border-color: ${props => props.theme.borderColorYellow};
`;
export const BorderColorTable = styled.View`
    border-color: ${props => props.theme.borderColorYellow};
`;
export const BorderColorBlue = styled.View`
    border-color: ${props => props.theme.blue};
`;
export const ColorButton = styled.TouchableOpacity`
    background: ${props => props.theme.btncrud};
`;
export const BackgroundInput = styled.View`
    background-color: ${props => props.theme.backgroundInput};
    border-color: ${props => props.theme.borderColorInput};
    color: ${props => props.theme.primary};
`;
export const BackgroundContainerInput = styled.View`
    background-color: ${props => props.theme.backgroundContainerInput};
`;
export const BackgroundInputText = styled.TextInput`
    background-color: ${props => props.theme.backgroundInput};
    border-color: ${props => props.theme.borderColorInput};
    color: ${props => props.theme.primary};
`;
export const ContainerCrud = styled.View`
    background: ${props => props.theme.backgroundContainerInput};
    border-color: ${props => props.theme.borderColorInput};
`;