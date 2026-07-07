"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

const LENGTHS = [
  { value: "short", label: "Short", desc: "~800 words" },
  { value: "standard", label: "Standard", desc: "~1,500 words" },
  { value: "long", label: "Long", desc: "~2,500 words" },
];

function BlogSetupForm() {
  const [model, setModel] = React.useState("sonnet");
  const [language, setLanguage] = React.useState("en");
  const [count, setCount] = React.useState([30]);
  const [length, setLength] = React.useState("standard");
  const [varyAnchors, setVaryAnchors] = React.useState(true);
  const [faqSchema, setFaqSchema] = React.useState(false);

  return (
    <Card className="mx-auto max-w-xl p-6">
      <div className="mb-5">
        <h3 className="font-heading text-[15px] font-semibold">Blog setup</h3>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Configure how TopicVane generates this site&apos;s articles.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="AI model"
            htmlFor="model"
            required
          >
            <Select
              value={model}
              onValueChange={setModel}
            >
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Anthropic</SelectLabel>
                  <SelectItem value="sonnet">Claude Sonnet 4.6</SelectItem>
                  <SelectItem value="haiku">Claude Haiku 4.5</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Other</SelectLabel>
                  <SelectItem value="gpt4o">GPT-4o</SelectItem>
                  <SelectItem value="deepseek">DeepSeek V3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Language"
            htmlFor="lang"
          >
            <Select
              value={language}
              onValueChange={setLanguage}
            >
              <SelectTrigger id="lang">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>

        <FormField
          label={
            <span className="flex w-full items-center justify-between">
              <span>Articles to generate</span>
              <span className="font-heading text-[13px] font-bold tabular-nums text-foreground">
                {count[0]}
              </span>
            </span>
          }
          description="Reserves 1 pillar per subtopic; the rest are distributed as supporting articles."
        >
          <Slider
            value={count}
            onValueChange={setCount}
            min={5}
            max={100}
            step={5}
            className="mt-1"
          />
        </FormField>

        <FormField label="Article length">
          <RadioGroup
            value={length}
            onValueChange={setLength}
            className="grid grid-cols-3 gap-3"
          >
            {LENGTHS.map((o) => (
              // biome-ignore lint/a11y/noLabelWithoutControl: RadioGroupItem is wrapped inside label
              <label
                key={o.value}
                className={cn(
                  "flex cursor-pointer flex-col gap-1 rounded-lg border p-3 transition-colors",
                  length === o.value
                    ? "border-primary bg-accent/50 ring-1 ring-primary"
                    : "border-border hover:border-muted-foreground/30",
                )}
              >
                <span className="flex items-center justify-between">
                  <span className="font-heading text-[13px] font-semibold">{o.label}</span>
                  <RadioGroupItem value={o.value} />
                </span>
                <span className="text-[12px] tabular-nums text-muted-foreground">{o.desc}</span>
              </label>
            ))}
          </RadioGroup>
        </FormField>

        <div className="space-y-3 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="anchors">Vary anchor text</Label>
              <p className="text-[12px] text-muted-foreground">
                Rotate exact / partial / branded anchors on internal links.
              </p>
            </div>
            <Switch
              id="anchors"
              checked={varyAnchors}
              onCheckedChange={setVaryAnchors}
            />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <Label htmlFor="faq">Include FAQ schema</Label>
              <p className="text-[12px] text-muted-foreground">
                Add FAQ structured data to supporting articles.
              </p>
            </div>
            <Switch
              id="faq"
              checked={faqSchema}
              onCheckedChange={setFaqSchema}
            />
          </div>
        </div>

        <FormField
          label="Citations / outbound URLs"
          htmlFor="citations"
          description="One URL per line — distributed contextually, capped at 2 per article."
        >
          <Textarea
            id="citations"
            placeholder={"https://example.org/study\nhttps://another-source.com/report"}
          />
        </FormField>

        <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
          <Button
            variant="ghost"
            size="sm"
          >
            Back
          </Button>
          <Button size="sm">
            Generate articles <Icons.next className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** Batch A5 — Forms & inputs. */
export function FormsGallery() {
  const [range, setRange] = React.useState([20, 60]);

  return (
    <>
      <Section
        title="Form — Blog setup (excerpt)"
        subtitle="Select · Slider · RadioGroup option cards · Switch · Textarea composed with FormField (label + control + help/error)"
      >
        <BlogSetupForm />
      </Section>

      <Section
        title="Individual controls & states"
        subtitle="Switch · RadioGroup · Slider (range) · Textarea error"
      >
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Switch
                defaultChecked
                id="s1"
              />
              <Label htmlFor="s1">On</Label>
              <Switch
                id="s2"
                className="ml-4"
              />
              <Label htmlFor="s2">Off</Label>
              <Switch
                disabled
                className="ml-4"
              />
              <span className="text-[13px] text-muted-foreground">Disabled</span>
            </div>

            <RadioGroup
              defaultValue="fresh"
              className="flex gap-6"
            >
              {/* biome-ignore lint/a11y/noLabelWithoutControl: RadioGroupItem is wrapped inside label */}
              <label className="flex items-center gap-2 text-[13px]">
                <RadioGroupItem value="fresh" /> Fresh index
              </label>
              {/* biome-ignore lint/a11y/noLabelWithoutControl: RadioGroupItem is wrapped inside label */}
              <label className="flex items-center gap-2 text-[13px]">
                <RadioGroupItem value="historic" /> Historic index
              </label>
            </RadioGroup>

            <div>
              <div className="mb-2 flex items-center justify-between text-[13px]">
                <span className="text-muted-foreground">Trust Flow range</span>
                <span className="font-medium tabular-nums">
                  {range[0]}–{range[1]}
                </span>
              </div>
              <Slider
                value={range}
                onValueChange={setRange}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </div>

          <FormField
            label="Notes"
            htmlFor="notes"
            error="Notes must be under 500 characters."
          >
            <Textarea
              id="notes"
              aria-invalid
              defaultValue={"This domain has a strong Business / Agriculture profile…"}
            />
          </FormField>
        </div>
      </Section>
    </>
  );
}
