export const loginLink = [{
  exact: true,
  label: 'Вход',
  icon: 'help_outline',
  to: '/',
}];

export const linksForAdmin = [
  {
    exact: true,
    label: 'Настройка',
    icon: 'build',
    to: '/admin',
  },
  {
    exact: true,
    label: 'Отчет(Макет)',
    icon: 'playlist_add_check',
    to: '/report',
  },
  {
    exact: true,
    label: 'Справочник хар-к',
    icon: 'info_outline',
    to: '/manual',
  },
];

export const linksForSeller = [
  {
    exact: true,
    label: 'Вопрос(Макет)',
    icon: 'help_outline',
    to: '/question',
  },
  {
    exact: true,
    label: 'Справочник хар-к',
    icon: 'info_outline',
    to: '/manual',
  },
];
