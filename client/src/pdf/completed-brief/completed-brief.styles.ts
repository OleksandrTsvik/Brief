import { Font, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
});

export const styles = StyleSheet.create({
  body: {
    fontFamily: 'Roboto',
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  header: {
    position: 'absolute',
    top: 10,
    right: 25,
    fontSize: 12,
    textAlign: 'right',
    color: 'grey',
  },
  titleDate: {
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 20,
  },
  index: {
    color: '#a61d24',
  },
  textTitle: {
    color: '#262626',
  },
  textTitleAnswer: {
    textTransform: 'uppercase',
    color: '#000000',
  },
  questionType: {
    fontSize: 10,
  },
  pageNumber: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
});
