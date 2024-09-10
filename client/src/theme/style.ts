import styled from 'styled-components/native';
export const Container = styled.View`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;
export const ContainerDrawer = styled.View`
  background: ${(props) => props.theme.drawer};
`;
export const ContainerAlter = styled.View`
  background: ${(props) => props.theme.backgroundAlter};
  color: ${(props) => props.theme.textAlter};
`;
export const ScrollContainer = styled.ScrollView`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  flex: 1;
`;
export const Subbox = styled.TouchableOpacity`
  background: ${(props) => props.theme.subbox};
`;
export const Name = styled.Text`
  color: ${(props) => props.theme.primary};
`;
export const NameAlter = styled.Text`
  color: ${(props) => props.theme.textAlter};
`;
export const NameBlue = styled.Text`
  color: ${(props) => props.theme.blue};
`;
export const NameBlueAlter = styled.Text`
  color: ${(props) => props.theme.blueAlter};
`;
export const Textbox = styled.Text`
  color: ${(props) => props.theme.text2};
`;
export const Line = styled.View`
  border-color: ${(props) => props.theme.blue};
`;

export const BorderColorContainer = styled.View`
  border-color: ${(props) => props.theme.borderColorYellow};
`;
export const BorderColorTable = styled.View`
  border-color: ${(props) => props.theme.borderColorYellow};
`;
export const BorderColorBlue = styled.View`
  border-color: ${(props) => props.theme.blue};
`;
export const ColorButton = styled.TouchableOpacity`
  background: ${(props) => props.theme.btncrud};
`;
export const BackgroundInput = styled.View`
  background-color: ${(props) => props.theme.backgroundInput};
  color: ${(props) => props.theme.primary};
`;
export const BackgroundContainerInput = styled.View`
  background-color: ${(props) => props.theme.backgroundContainerInput};
`;
export const BackgroundInputText = styled.TextInput`
  background-color: ${(props) => props.theme.backgroundInput};
  border-color: ${(props) => props.theme.borderColorInput};
  color: ${(props) => props.theme.primary};
`;
export const ContainerCrud = styled.View`
  background: ${(props) => props.theme.backgroundContainerInput};
  border-color: ${(props) => props.theme.borderColorInput};
`;
export const BorderColorButton = styled.TouchableOpacity`
  border-color: ${(props) => props.theme.primary};
`;
export const BorderColorButtonYellow = styled.TouchableOpacity`
  border-color: ${(props) => props.theme.borderColorYellow};
`;
export const BorderColorBackground= styled.View`
  border-color: ${(props) => props.theme.background};
`;
export const Card= styled.View`
  background: ${(props) => props.theme.card};
  border-color: ${(props) => props.theme.borderCard};
`;
export const FooterContainer = styled.View` 
  background: ${(props) => props.theme.backgroundFooter};
`;
export const ImageCard = styled.Image`
  border-color: ${(props) => props.theme.borderCard};
`;
export const ContainerData = styled.View`
  background: ${(props) => props.theme.backgroundData};
  border-color: ${(props) => props.theme.blue};  
`;
