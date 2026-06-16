import { useState, useEffect, useCallback, useRef, type Dispatch, type SetStateAction } from "react";

export interface PaginationMeta {
    total: number;
    page: number;
    size: number;
    totalPages: number;
}

interface UsePaginationOptions<TData> {
    fetcher: (page: number, size: number) => Promise<{ data: TData[]; meta: PaginationMeta }>;
    defaultSize?: number;
}

interface UsePaginationReturn<TData> {
    data: TData[];
    meta: PaginationMeta | null;
    page: number;
    size: number;
    isLoading: boolean;
    setData: Dispatch<SetStateAction<TData[]>>;
    setPage: (page: number) => void;
    setSize: (size: number) => void;
    refetch: () => Promise<void>;
    onItemDeleted: () => Promise<void>;
}

export function usePagination<TData>({
    fetcher,
    defaultSize = 10,
}: UsePaginationOptions<TData>): UsePaginationReturn<TData> {
    const [data, setData] = useState<TData[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [page, setPageState] = useState(1);
    const [size, setSizeState] = useState(defaultSize);
    const [isLoading, setIsLoading] = useState(true);

    const skipAutoFetchRef = useRef(false);
    const fetchIdRef = useRef(0);
    const fetcherRef = useRef(fetcher);

    useEffect(() => {
        fetcherRef.current = fetcher;
    });

    const fetchData = useCallback(async (pageToFetch: number, sizeToFetch: number) => {
        fetchIdRef.current += 1;
        const fetchId = fetchIdRef.current;
        setIsLoading(true);
        try {
            const result = await fetcherRef.current(pageToFetch, sizeToFetch);
            if (fetchId === fetchIdRef.current) {
                setData(result.data);
                setMeta(result.meta);
            }
            return result;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (fetchId === fetchIdRef.current) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        if (skipAutoFetchRef.current) {
            skipAutoFetchRef.current = false;
            return;
        }
        fetchData(page, size);
    }, [fetchData, page, size]);

    const setPage = (newPage: number) => {
        setPageState(newPage);
    };

    const setSize = (newSize: number) => {
        setSizeState(newSize);
        setPageState(1);
    };

    const refetch = useCallback(async () => {
        await fetchData(page, size);
    }, [fetchData, page, size]);

    const onItemDeleted = useCallback(async () => {
        if (!meta) {
            await fetchData(page, size);
            return;
        }

        const expectedTotal = Math.max(meta.total - 1, 0);
        const expectedTotalPages = Math.max(Math.ceil(expectedTotal / size), 1);

        if (expectedTotal === 0) {
            skipAutoFetchRef.current = true;
            setPageState(1);
            try {
                await fetchData(1, size);
            } finally {
                skipAutoFetchRef.current = false;
            }
            return;
        }

        if (page > expectedTotalPages) {
            skipAutoFetchRef.current = true;
            setPageState(expectedTotalPages);
            try {
                await fetchData(expectedTotalPages, size);
            } finally {
                skipAutoFetchRef.current = false;
            }
            return;
        }

        await fetchData(page, size);
    }, [meta, page, size, fetchData]);

    return {
        data,
        meta,
        page,
        size,
        isLoading,
        setData,
        setPage,
        setSize,
        refetch,
        onItemDeleted,
    };
}
