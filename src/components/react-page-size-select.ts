import * as React from 'react';

export interface Props {
  id?: string;
  name?: string;
  size?: number;
  sizes?: number[];
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}
export const pageSizes: number[] = [12, 24, 60, 100, 120, 180, 300, 600];
/*
export class PageSizeSelect extends React.Component<Props, any> {
  render() {
    const {id, name, sizes, size, onChange} = this.props;
    const s = (!sizes || sizes.length === 0 ? pageSizes : sizes);
    const pageSizeOptions = s.map(pgSize => (
      <option key={pgSize} value={pgSize}>{pgSize}</option>)
    );
    return (
      <select id={id} name={name} value={size} onChange={onChange}>
        {pageSizeOptions}
      </select>
    );
  }
}
export default PageSizeSelect;
*/
export function PageSizeSelect(p: Props) {
  const g = p.sizes;
  const s = (!g || g.length === 0 ? pageSizes : g);
  /*
  const opts = s.map(pgSize => (
    <option key={pgSize} value={pgSize}>{pgSize}</option>)
  );
  return (
    <select id={p.id} name={p.name} value={p.size} onChange={p.onChange}>
      {opts}
    </select>
  );
  */
  const opts = s.map(pgSize => React.createElement('option', { key: pgSize, value: pgSize }, pgSize));
  return React.createElement('select', { id: p.id, name: p.name, value: p.size, onChange: p.onChange }, opts);
}
export default PageSizeSelect;
