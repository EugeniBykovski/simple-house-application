export interface WelcomingProps extends React.HTMLAttributes<HTMLDivElement> {
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  showOnlyOnPath?: string;
  username?: string;
  name?: string | null;
  surname?: string | null;
}
