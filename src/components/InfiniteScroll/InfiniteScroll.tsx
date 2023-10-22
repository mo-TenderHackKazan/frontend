import React, { ElementType, useCallback, useEffect, useRef } from 'react';
import composeRefs from '@seznam/compose-react-refs/composeRefs';
import clsx from 'clsx';
import { PolyExtends } from '../../utils/types';

export const InfiniteScrollDefaultComponent = 'div' as const;
export type InfiniteScrollDefaultComponentType = typeof InfiniteScrollDefaultComponent;

export interface InfiniteScrollSelfProps<ComponentType extends ElementType = InfiniteScrollDefaultComponentType> {
  /**
   * Дополнительный css-класс на корневой элемент
   */
  className?: string;
  /**
   * Функция, вызываемая при подгрузке данных
   */
  fetchMore: () => void;
  /**
   * Флаг, отвечающий за наличие данных для подгрузки
   */
  hasMore: boolean;
  /**
   * Состояние загрузки
   */
  isLoading?: boolean;
  /**
   * Реф на корневой элемент
   */
  innerRef?: React.ComponentProps<ComponentType>['ref'];
  /**
   * Количество пикселей до конца контейнера, при которых вызывается подгрузка.
   * По умолчанию 20
   */
  scrollOffset?: number;
}

export type InfiniteScrollProps<ComponentType extends ElementType = InfiniteScrollDefaultComponentType> = PolyExtends<
  ComponentType,
  InfiniteScrollSelfProps<ComponentType>,
  React.ComponentPropsWithoutRef<ComponentType>
>;

const SCROLL_OFFSET = 20;

export function InfiniteScroll<ComponentType extends ElementType = InfiniteScrollDefaultComponentType>(
  props: InfiniteScrollProps<ComponentType>
) {
  const {
    component,
    children,
    className,
    fetchMore,
    hasMore,
    isLoading,
    innerRef,
    scrollOffset = SCROLL_OFFSET,
    ...restProps
  } = props;

  const Component = (component || InfiniteScrollDefaultComponent) as React.ElementType;

  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) {
      return;
    }

    if (isLoading || !hasMore) {
      return;
    }

    const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;

    if (scrollTop + clientHeight >= scrollHeight - scrollOffset) {
      fetchMore();
    }
  }, [fetchMore, hasMore, isLoading, scrollOffset]);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const scrollNode = scrollRef.current;

    scrollNode.addEventListener('scroll', handleScroll);

    return () => scrollNode.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isLoading, scrollRef]);

  return (
    <Component className={clsx(className)} ref={composeRefs(scrollRef, innerRef)} {...restProps}>
      {children}
    </Component>
  );
}
