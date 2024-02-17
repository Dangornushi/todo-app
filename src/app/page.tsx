"use client";
import NextLink from "next/link";

export default function Home() {
  return (
    <main>
      <div className="bg-gray-400">
        <NextLink href="/DataView">データ一覧</NextLink>
      </div>
      <div className="bg-gray-500">
        <NextLink href="/DataInput">データ追加</NextLink>
      </div>
    </main>
  );
}
