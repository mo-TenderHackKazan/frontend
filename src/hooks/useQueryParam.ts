import { useLocation, useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type UseQueryParamReturn<T> = [T, (value: T) => void];

const defaultSetter = <T = string | null>(value: T) => String(value);

export const useQueryParam = <T = string | null>(
  key: string,
  defaultValue?: T,
  getter?: (value: string | null) => T,
  setter: (value: T) => string = defaultSetter
): UseQueryParamReturn<T> => {
  const { state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const transformedDefaultValue = defaultValue !== undefined ? setter(defaultValue) : null;
  const [paramState, setParamState] = useState<string | null>(searchParams.get(key) || transformedDefaultValue);

  useEffect(() => {
    setParamState(searchParams.get(key) || transformedDefaultValue);
  }, [searchParams]);

  const value = useMemo(() => {
    if (getter) {
      return getter(paramState);
    }
    return paramState;
  }, [paramState, getter]);

  const setValue = useCallback(
    (value: T) => {
      let transformedValue: string | null = value ? String(value) : null;
      if (setter) {
        transformedValue = setter(value);
      }
      setParamState(transformedValue);

      const params = Object.fromEntries(Array.from(searchParams));
      if (transformedValue) {
        setSearchParams(
          {
            ...params,
            [key]: transformedValue
          },
          {
            replace: true,
            state
          }
        );
      } else {
        delete params[key];
        setSearchParams(params, {
          replace: true,
          state
        });
      }
    },
    [key, searchParams, setSearchParams, setter, state]
  );

  return [value as T, setValue];
};
