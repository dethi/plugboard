import NotImg from '../../../media/preview/Not.png';
import AndImg from '../../../media/preview/And.png';
import OrImg from '../../../media/preview/Or.png';
import InputImg from '../../../media/preview/Input.png';
import OutputImg from '../../../media/preview/Output.png';

export default class ImageElComponentProvider {
  static getElementImage(name) {
    return this.images[name];
  }
}

ImageElComponentProvider.images = {
  Not: NotImg,
  And: AndImg,
  Or: OrImg,
  Input: InputImg,
  Output: OutputImg
};
