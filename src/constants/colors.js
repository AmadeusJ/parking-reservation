/**
 * 색상 상수
 *
 * @type {Object}
 */

// 기본 색상
const white = '#ffffff';
const black = '#000000';
const gray = '#8f8d8d';
const primary = '#eb008b';
const secondary = '#b5b2b2';

const female = '#D8538E';
const elderly = '#0165C2';
const disabled = '#0000ff';
const ev = '#297355';

// 주차장 상태 색상
const unoccupied = '#00D841';
// const unoccupied = '#B5B2B2';
const reserved = primary;
const occupied = '#B5B2B2';

// 버튼 색상
export const btnColors = {
  primary: { base: primary, hover: '#c2006e', active: '#990059' },
  secondary: { base: secondary, hover: '#969494', active: '#737171' },
  white: { base: white, hover: '#d0d0d0', active: '#e8e8e8' },
};

export const colors = {
  white,
  black,
  gray,
  primary,
  secondary,
  unoccupied,
  reserved,
  occupied,
  female,
  elderly,
  disabled,
  ev,
};
