import styled from "styled-components/native";
export const Container = styled.View`
    background: ${props=> props.theme.background};
    color: ${props=> props.theme.text};
`;
export const ScrollContainer = styled.ScrollView`
    background: ${props=> props.theme.background};
    color: ${props=> props.theme.text};
    flex: 1;
`;
export const Name = styled.Text`
    color: ${props=> props.theme.primary};
`;
export const NameBlue = styled.Text`
    color: ${props=> props.theme.blue};
`;
export const Line= styled.View`
    border-color: ${props=> props.theme.blue};
`;
export const BorderColorContainer= styled.View`
    border-color: ${props=> props.theme.borderColorYellow};
`;
export const BorderColorInput= styled.TextInput`
    border-color: ${props=> props.theme.borderColorInput};
    color: ${props=> props.theme.primary};
`;
export const BorderColorTable= styled.View`
    border-color: ${props=> props.theme.borderColorYellow};
`;
export const ColorButton= styled.TouchableOpacity`
    background: ${props=> props.theme.btncrud};
`;