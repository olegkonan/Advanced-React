/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/dist/client/router';
import { useCallback } from 'react';
import { SEARCH_PRODUCTS_QUERY } from '../graphql/queries';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

export function Search() {
  const router = useRouter();
  const [searchItems, { data, loading }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache',
  });
  const items = data?.result || [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchItemsWithDebounce = useCallback(debounce(searchItems, 300), []);

  resetIdCounter();
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange: ({ inputValue }) =>
      searchItemsWithDebounce({ variables: { search: inputValue } }),
    onSelectedItemChange: ({ selectedItem }) =>
      router.push({ pathname: `/product/${selectedItem.id}` }),
    itemToString: (item) => item?.name || '',
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width="50"
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, no items found</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
