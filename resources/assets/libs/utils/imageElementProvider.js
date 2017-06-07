import NotImg from '../../../media/components/not.png';
import AndImg from '../../../media/components/and.png';
import OrImg from '../../../media/components/or.png';
import XorImg from '../../../media/components/xor.png';
import InputImg from '../../../media/components/input.png';
import InputImgOn from '../../../media/components/inputOn.png';
import OutputImg from '../../../media/components/output.png';
import OutputImgOn from '../../../media/components/outputOn.png';

export class ImageElementProvider {
  static getElementImage(name) {
    return this.images[name];
  }
}

ImageElementProvider.images = {
  Not: NotImg,
  And: AndImg,
  Or: OrImg,
  Xor: XorImg,
  Input: InputImg,
  InputOn: InputImgOn,
  Output: OutputImg,
  OutputOn: OutputImgOn
};
