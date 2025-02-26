// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle , TextStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',

  'cart.fill': 'shopping-cart',         // Shopping cart icon
  'heart.fill': 'favorite',             // Heart icon
  'bell.fill': 'notifications',         // Bell icon
  'person.fill': 'person',              // User profile icon
  'gearshape.fill': 'settings',         // Settings icon
  'lock.fill': 'lock',                  // Lock icon
  'star.fill': 'star',                  // Star icon
  'creditcard.fill': 'credit-card',      // Payment icon
  'trash.fill': 'delete',               // Delete icon
  'map.fill': 'map',       
  
  
  // 🍔 FOOD ICONS
  'fork.knife': 'restaurant',               // Fork & knife (restaurant)
  'cup.and.saucer.fill': 'local-cafe',      // Coffee cup
  'carrot.fill': 'emoji-food-beverage',     // Healthy food (carrot)
  'takeoutbag.and.cup.and.straw.fill': 'fastfood',  // Takeout food
  'birthday.cake.fill': 'cake',             // Birthday cake
  'wineglass.fill': 'local-bar',            // Wine glass
  'fish.fill': 'set-meal',                  // Fish dish
  'pizza.fill': 'local-pizza',              // Pizza
  'bread.fill': 'bakery-dining',            // Bread (bakery)
  'bowl.fill': 'ramen-dining',              // Bowl (noodles, soup)
  'icecream.fill': 'icecream',              // Ice cream
  'hamburger.fill': 'lunch-dining',         // Burger
  'spoon.fill': 'dining',                   // Spoon (general dining)// Map/location icon

} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
