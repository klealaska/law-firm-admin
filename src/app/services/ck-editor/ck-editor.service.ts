import { Injectable } from '@angular/core';
import * as ClassicEditorBuild from '../../config-files/ckEditor-config-file/vendor/build/ckeditor.js';

@Injectable({
  providedIn: 'root'
})
export class CkEditorService {

  Editor = ClassicEditorBuild;
  public editorConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'underline',
        'link',
        'paragraph',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'insertTable',
        'blockQuote',
        'undo',
        'redo',
        'alignment',
        'fontBackgroundColor',
        'fontColor',
        'fontSize',
        'fontFamily',
        'highlight',
        'horizontalLine',
        'removeFormat',
        '|',
        'specialCharacters',
        'specialCharactersArrows',
        'specialCharactersCurrency',
        'specialCharactersEssentials',
        'specialCharactersLatin',
        'specialCharactersText',
        'strikethrough',
        'subscript',
        'superscript',
        '|',
        'autoformat',
        'autolink',
        'code',
        'essentials',
        'pasteFromOffice',
        '|',
        'table',
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
        'tableToolbar',
      ]
    },
    language: 'en',
    // table: {
    //   toolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
    // },
  };


  constructor() { }
}
