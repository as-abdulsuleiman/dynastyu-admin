export interface ICallOutOptions {
  title: string;
  type: string | any;
  color: string;
  className: string;
  icon?: () => void;
  content?: string | null | undefined;
  flagUrl?: string;
}
