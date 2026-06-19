import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, Terminal, Zap, Server, Copy, Check, 
  Sparkles 
} from "lucide-react";

interface VideoResult {
  type: string;
  id: string;
  name: string;
  description: string;
  url: string;
  views: number;
  published: string;
  author: string;
  duration: string;
  thumbnail: string;
  isLive: boolean;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [responseTime, setResponseTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedTrending, setCopiedTrending] = useState(false);
  
  const [trendingResults, setTrendingResults] = useState<any>(null);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingResponseTime, setTrendingResponseTime] = useState<number>(0);
  const [trendingError, setTrendingError] = useState<string | null>(null);
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const liveEndpoint = `${baseUrl}/api/v1/search?q=${encodeURIComponent(query || "music")}`;
  const trendingEndpoint = `${baseUrl}/api/v1/trending`;

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) return;
    setLoading(true);
    setResults(null);
    setError(null);
    const start = performance.now();
    try {
      const response = await fetch(`/api/v1/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResponseTime(Math.round(performance.now() - start));
      if (!response.ok) throw new Error(data.error || 'Search failed');
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleTrending = async () => {
    setTrendingLoading(true);
    setTrendingResults(null);
    setTrendingError(null);
    const start = performance.now();
    try {
      const response = await fetch('/api/v1/trending');
      const data = await response.json();
      setTrendingResponseTime(Math.round(performance.now() - start));
      if (!response.ok) throw new Error(data.error || 'Trending fetch failed');
      setTrendingResults(data);
    } catch (err) {
      setTrendingError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setTrendingLoading(false);
    }
  };

  const copyEndpoint = async (text: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      <header className="border-b border-border/40 glass sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center border border-primary/20">
              <Terminal className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold tracking-tight text-lg">BWM XMD <span className="text-primary">YTS</span></span>
          </div>
          <Button variant="outline" size="sm" className="gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            v3.0.0 Live
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex flex-col gap-8 max-w-6xl">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
            YouTube Search API
          </h1>
          <p className="text-muted-foreground text-lg">
            High-performance JSON endpoints for video metadata extraction
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-4 h-4 text-primary" />
                Search API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">API Endpoint</label>
                    <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1" onClick={() => copyEndpoint(liveEndpoint, setCopied)}>
                      {copied ? <><Check className="w-3 h-3 text-emerald-500" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                    </Button>
                  </div>
                  <div className="p-3 bg-[#0a0a0a] rounded-lg border border-primary/30 font-mono text-xs break-all">
                    <span className="text-primary font-bold">GET </span>
                    <span className="text-foreground select-all">{liveEndpoint}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Query (q)</label>
                  <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. funny cats, music video..." className="font-mono bg-background/50 border-primary/20 focus-visible:ring-primary/30" />
                </div>
                <Button type="submit" className="w-full font-medium" disabled={loading}>
                  {loading ? <Zap className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                  Send Search Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                Trending API
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">API Endpoint</label>
                  <Button type="button" variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1" onClick={() => copyEndpoint(trendingEndpoint, setCopiedTrending)}>
                    {copiedTrending ? <><Check className="w-3 h-3 text-emerald-500" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                  </Button>
                </div>
                <div className="p-3 bg-[#0a0a0a] rounded-lg border border-emerald-500/30 font-mono text-xs break-all">
                  <span className="text-emerald-500 font-bold">GET </span>
                  <span className="text-foreground select-all">{trendingEndpoint}</span>
                </div>
              </div>
              <Button type="button" onClick={handleTrending} className="w-full font-medium bg-emerald-600 hover:bg-emerald-700" disabled={trendingLoading}>
                {trendingLoading ? <Zap className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                Get Trending JSON
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">Returns 20 organized categories with 10 videos each</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="bg-muted/50 border border-border/50">
              <TabsTrigger value="search" className="font-mono text-xs">Search Results</TabsTrigger>
              <TabsTrigger value="trending" className="font-mono text-xs">Trending Results</TabsTrigger>
            </TabsList>
            <TabsContent value="search" className="mt-4">
              <Card className="border-border/50 bg-[#0d0d0d] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div className="text-sm font-mono text-muted-foreground">Search API Response</div>
                  {results && <div className="text-xs font-mono">Status: <span className="text-emerald-500">200 OK</span> • Time: <span className="text-primary ml-2">{responseTime}ms</span></div>}
                </div>
                <ScrollArea className="h-[500px] p-4">
                  {error ? <div className="h-full flex flex-col items-center justify-center text-red-400 gap-4"><Server className="w-12 h-12" /><p className="font-mono text-sm">Error: {error}</p></div> : results ? <pre className="font-mono text-sm leading-relaxed"><code>{JSON.stringify(results, null, 2)}</code></pre> : <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 gap-4"><Server className="w-12 h-12" /><p className="font-mono text-sm">No search results yet</p></div>}
                </ScrollArea>
              </Card>
            </TabsContent>
            <TabsContent value="trending" className="mt-4">
              <Card className="border-border/50 bg-[#0d0d0d] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-border/50">
                  <div className="text-sm font-mono text-muted-foreground">Trending API Response</div>
                  {trendingResults && <div className="text-xs font-mono">Status: <span className="text-emerald-500">200 OK</span> • Time: <span className="text-emerald-500 ml-2">{trendingResponseTime}ms</span></div>}
                </div>
                <ScrollArea className="h-[500px] p-4">
                  {trendingError ? <div className="h-full flex flex-col items-center justify-center text-red-400 gap-4"><Server className="w-12 h-12" /><p className="font-mono text-sm">Error: {trendingError}</p></div> : trendingResults ? <pre className="font-mono text-sm leading-relaxed"><code>{JSON.stringify(trendingResults, null, 2)}</code></pre> : <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40 gap-4"><Server className="w-12 h-12" /><p className="font-mono text-sm">No trending results yet</p></div>}
                </ScrollArea>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
