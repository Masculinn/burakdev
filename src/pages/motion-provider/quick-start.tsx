import Head from "next/head";
import CodeProvider from "@/components/Documentation/code-provider";
import { useSelector } from "react-redux";
import { ReduxThemeProps } from "@/interfaces";
import documentationLib from "@/lib/documentation.lib";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { CodeBadge } from "@/components/Documentation/code-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Instructions from "@/components/Documentation/instructions";

export default function QuickStart() {
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const isMobile = useIsMobile();

  const fontSize = isMobile ? "sm" : "md";

  return (
    <>
      <Head>
        <title>Motion Provider - Quick Start</title>
        <meta
          name="description"
          content="Discover the core features of our React animation library with Motion Provider."
        />
        <meta property="og:title" content="Motion Provider - Quick Start" />
        <meta
          property="og:description"
          content="Discover the core features of our React animation library with Motion Provider."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content="https://burakdev.com/motion-provider/quick-start"
        />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Prerequired Dependencies</h2>
          <p className="mb-4 text-muted-foreground">
            Get started by installing the next.js.
          </p>
          <CodeProvider
            bordered
            rounded
            lang="git"
            fontSize={fontSize}
            code={documentationLib.next.code}
            appTheme={theme}
            showLineNumbers={false}
          />

          <p className="my-4 text-muted-foreground">
            Then continue with installing the dependencies.
          </p>
          <CodeProvider
            bordered
            rounded
            lang="git"
            fontSize={fontSize}
            code={documentationLib.prerequired.code}
            appTheme={theme}
            showLineNumbers={false}
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Note: Motion Provider requires latest version of React, TypeScript
            5.0+ and latest version of Tailwindcss for optimal functionality.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 capitalize">
            Add tailwind config
          </h2>
          <div className="mb-4 text-muted-foreground">
            <span>Create tailwind config cn function inside </span>
            <Badge variant="outline">
              <code>@lib/utils.ts</code>{" "}
            </Badge>{" "}
            <span>directory if not exist.</span>
          </div>
          <CodeProvider
            bordered
            rounded
            lang="typescript"
            fontSize={fontSize}
            code={documentationLib.cn.code}
            appTheme={theme}
            showLineNumbers={false}
          />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <p className="mb-4 text-muted-foreground">Install the core API.</p>
          <Tabs defaultValue="manual" className="w-full">
            <TabsList className="lg:grid w-full lg:grid-cols-3 flex flex-col h-auto lg:max-h-max">
              <TabsTrigger value="auto" className="font-bold">
                Via npx Installation
              </TabsTrigger>
              <TabsTrigger value="manual" className="font-bold">
                Manual Installation
              </TabsTrigger>
              <TabsTrigger value="git" className="font-bold">
                Github Installation
              </TabsTrigger>
            </TabsList>
            <TabsContent value="auto">
              <Card>
                <CardHeader>
                  <CardTitle>Via npx Installation</CardTitle>
                  <CardDescription className="text-muted-foreground font-bold py-2">
                    <Alert className="my-2" variant={"destructive"}>
                      <AlertTitle className="flex items-center gap-2">
                        <TriangleAlert />
                        <span className="lg:text-lg text-base font-bold">
                          Warning
                        </span>
                      </AlertTitle>
                      <AlertDescription className="mt-2 space-y-2 font-bold tracking-tight">
                        NPX version is not in production yet! It will be
                        published via <CodeBadge code="npx" />, on 21/02/2025.
                        For now, only manual installation is valid. So please
                        select manual installation and then follow the
                        instructions.
                      </AlertDescription>
                    </Alert>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CodeProvider
                    bordered
                    rounded
                    fontSize={fontSize}
                    lang="bash"
                    code={documentationLib.installation.code}
                    appTheme={theme}
                    showLineNumbers={false}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Installation</CardTitle>
                  <CardDescription className="py-2">
                    <Alert className="my-2" variant={"destructive"}>
                      <AlertTitle className="flex items-center gap-2">
                        <TriangleAlert />
                        <span className="lg:text-lg text-base font-bold">
                          Warning
                        </span>
                      </AlertTitle>
                      <AlertDescription className="mt-2 space-y-2 font-bold tracking-tight">
                        NPX version is not in production yet! It will be
                        published via <CodeBadge code="npx" />, on 21/02/2025.
                        For now, only manual installation is valid. So please
                        select manual installation and then follow the
                        instructions.
                      </AlertDescription>
                    </Alert>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Instructions />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="git">
              <Card>
                <CardHeader>
                  <CardTitle>Installation Via Git</CardTitle>
                  <CardDescription className="py-2">
                    Please follow the instructions below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <CodeProvider
                    code="git clone 'https://github.com/Masculinn/motion-provider.git'"
                    appTheme={theme}
                    bordered
                    fontSize={fontSize}
                    rounded
                  />
                  <p className="text-muted-foreground border-l-2 pl-2 border-stone-600 text-sm mt-8">
                    Here is the official github repo:{" "}
                    <Link
                      href="https://github.com/Masculinn/motion-provider"
                      target="_blank"
                      className="hover:text-stone-600 dark:hover:text-white underline-offset-4 underline"
                    >
                      Click here to go to the page
                    </Link>{" "}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="my-4  text-muted-foreground">
            After installation your project directory should look like this:
          </p>
          <CodeProvider
            bordered
            fontSize={fontSize}
            rounded
            lang="bash"
            code={documentationLib.rootDirectory.code}
            appTheme={theme}
          />
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Basic Usage</h2>
          <p className="mb-4 text-muted-foreground">
            Wrap your components with the ViewAnimationContainer to enable
            animations. The component provides sensible defaults while offering
            extensive customization options.
          </p>
          <CodeProvider
            lang="typescript"
            code={documentationLib.basicMotionUsage.code}
            fontSize={fontSize}
            bordered
            appTheme={theme}
          />
          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <Badge variant="outline">
                <code>mode</code>
              </Badge>
              <p className="text-muted-foreground text-sm">
                Defines the animation type{" "}
                {"(supports single or multiple animations)"}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                <code>elementType</code>
              </Badge>

              <p className="text-muted-foreground text-sm">
                Creates the DOM as animation container. Accepts valid HTML
                elements such as
                {" (div, span, section, etc)"}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                <code>transition</code>
              </Badge>
              <p className="text-muted-foreground text-sm">
                Predefined easing functions for smooth animations
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                <code>delay</code>
              </Badge>
              <p className="text-muted-foreground text-sm">
                Delays the animation in seconds default to 0
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                <code>configView</code>
              </Badge>
              <p className="text-muted-foreground text-sm">
                A configuration object for the animation. Takes two key-value
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <Badge variant="outline" className="w-auto ">
                <code>configView.once</code>
              </Badge>
              <p className="text-muted-foreground text-sm">
                If true the animation will play only once when the component
                entered on the viewport.if it is false the animation will repeat
                recursively once the element or component entered the viewport.
              </p>
            </div>
            <div className="flex flex-row gap-2">
              <Badge variant="outline" className="w-auto ">
                <code>configView.amount</code>
              </Badge>
              <p className="text-muted-foreground text-sm">
                The threshold amount of the viewport to trigger the animation.{" "}
                <Link
                  href="https://motion.dev/docs/react-use-in-view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Check the API from official motion docs
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
