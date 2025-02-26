import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'text'|'seperat' |'signup' | 'forgetpassword'|'se';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'text' ? styles.text : undefined,
        type === 'seperat' ? styles.seperat : undefined,
        type === 'se' ? styles.se : undefined,
        type === 'signup' ?styles.signup : undefined,
        type === 'forgetpassword' ?styles.forgetpassword : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    color : "white"
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  text: {
    fontSize:24,
    fontWeight: 'bold',
    lineHeight: 38,
    //color : ''
  },
  seperat: {
    height: 1, 
    //backgroundColor: '#ccc', 
    marginVertical: 10

  },
  se: {
    //flex:1,
    fontSize:32,
    fontWeight: 'bold',
    lineHeight: 32,
    color : 'black'
    

  },

  signup:{
    gap:8,
    marginHorizontal:10,
    // paddingVertical:10,
    
    //justifyContent : "space-around",
    
  },
  forgetpassword:{
    marginHorizontal:10,
    //justifyContent : "space-evenly",
    fontSize:15
  }
  
});
