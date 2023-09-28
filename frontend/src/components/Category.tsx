export type CategoryType = {
    name: string;   
    link: string;
}
export type CategoryProps = CategoryType & {
  onClick: () => void;
};

export function Category(props: CategoryProps): React.ReactNode {
  return (
    <a onClick={props.onClick} className="category-navigation-link">
      {props.name}
    </a>
  );
}