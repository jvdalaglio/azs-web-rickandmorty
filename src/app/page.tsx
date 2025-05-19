"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Tabs
        defaultValue="episodes"
        className="w-full flex flex-col items-center gap-4"
      >
        <TabsList>
          <TabsTrigger value="episodes">Episódios</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
        </TabsList>
        <TabsContent value="episodes">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="favorites">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
