export const settingsList: Settings = {
  main: {
    id: 'main',
    title: 'Kolory główne',
    data: [
      {
        id: 'bg_main',
        name: 'Tło',
        default: '#008000',
        value: '#008000',
      },
      {
        id: 'clr_main',
        name: 'Tekst',
        default: '#333333',
        value: '#333333',
      },
    ],
  },
  window: {
    id: 'window',
    title: 'Kolory okienek',
    data: [
      {
        id: 'bg_window',
        name: 'Tło',
        default: '#f5f5f5',
        value: '#f5f5f5',
      },
      {
        id: 'clr_window',
        name: 'Tekst',
        default: '#000000',
        value: '#000000',
      },
    ],
  },
  file: {
    id: 'file',
    title: 'Kolory przycisków do wybieranie plików',
    data: [
      {
        id: 'bg_input_file_button',
        name: 'Tło',
        default: '#f5f5f5',
        value: '#f5f5f5',
      },
      {
        id: 'clr_input_file_button',
        name: 'Tekst',
        default: '#000000',
        value: '#000000',
      },
      {
        id: 'bg_input_file_button_hover',
        name: 'Tło po najechaniu',
        default: '#008000',
        value: '#008000',
      },
      {
        id: 'clr_input_file_button_hover',
        name: 'Tekst po najechaniu',
        default: '#ffffff',
        value: '#ffffff',
      },
    ],
  },
  svg: {
    id: 'svg',
    title: 'Kolory osób',
    data: [
      {
        id: 'bg_svg_box',
        name: 'Tło',
        default: '#ffffff',
        value: '#ffffff',
      },
      {
        id: 'clr_svg_box',
        name: 'Tekst',
        default: '#000000',
        value: '#000000',
      },
      {
        id: 'bg_svg_box_hover',
        name: 'Tło po najechaniu',
        default: '#a2f10e',
        value: '#a2f10e',
      },
      {
        id: 'bg_svg_box_active',
        name: 'Krawędź aktywnej osoby',
        default: '#ff0000',
        value: '#ff0000',
      },
      {
        id: 'bg_svg_box_option',
        name: 'Tło opcji',
        default: '#ffffff',
        value: '#ffffff',
      },
      {
        id: 'clr_svg_box_option',
        name: 'Tekst opcji',
        default: '#000000',
        value: '#000000',
      },
      {
        id: 'bg_svg_box_option_hover',
        name: 'Tło opcji',
        default: '#add8e6',
        value: '#add8e6',
      },
    ],
  },
  menu: {
    id: 'menu',
    title: 'Kolory menu',
    data: [
      {
        id: 'bg_menu',
        name: 'Tło',
        default: '#44c708',
        value: '#44c708',
      },
      {
        id: 'bg_menu_hover',
        name: 'Tło po najechaniu',
        default: '#01aa01',
        value: '#01aa01',
      },
      {
        id: 'clr_menu',
        name: 'Tekst',
        default: '#000000',
        value: '#000000',
      },
    ],
  },
  search: {
    id: 'search',
    title: 'Kolory wyszukiwarki',
    data: [
      {
        id: 'bg_input_search',
        name: 'Tło',
        default: '#ffffff',
        value: '#ffffff',
      },
      {
        id: 'clr_input_search',
        name: 'Tekst',
        default: '#000000',
        value: '#000000',
      },
      {
        id: 'bg_search_hint',
        name: 'Tło podpowiedzi',
        default: '#dadada',
        value: '#dadada',
      },
      {
        id: 'clr_search_hint',
        name: 'Tekst podpowiedzi',
        default: '#000000',
        value: '#000000',
      },
      {
        id: 'bg_search_hint_hover',
        name: 'Tło podpowiedzi po najechaniu',
        default: '#19f519',
        value: '#19f519',
      },
      {
        id: 'clr_search_hint_hover',
        name: 'Tekst podpowiedzi po najechaniu',
        default: '#000000',
        value: '#000000',
      },
    ],
  },
}
