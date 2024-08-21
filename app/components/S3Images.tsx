"use server";

import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default async function S3Images({ url }: { url: string }) {
  const { data } = useSWR<{ Key?: string }[]>(
    "/api/documents",
    await fetcher(url)
  );
  return data?.map((image) => <S3Image Key={image.Key + ""} />);
}

const S3Image = ({ Key }: { Key: string }) => {
  const { data } = useSWR<{ src: string }>(`/api/documents/${Key}`, fetcher);
  const src = data?.src ? data?.src : "";

  return <Image src={src} alt="image" />;
};
