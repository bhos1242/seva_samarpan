"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InputField from "@/components/AppInputFields/InputField";
import { toast } from "sonner";

// Form schema with all input types
const formSchema = z.object({
  // Basic Inputs
  textInput: z.string().min(1, "Text is required"),
  emailInput: z.string().email("Invalid email"),
  passwordInput: z.string().min(6, "Password must be at least 6 characters"),
  numberInput: z.number().min(0, "Must be positive"),
  phoneInput: z.string().optional(),
  
  // Selection Inputs
  selectInput: z.string().optional(),
  multiSelectInput: z.array(z.string()).optional(),
  radioInput: z.string().optional(),
  yesNoRadio: z.string().optional(),
  
  // Boolean Inputs
  checkboxInput: z.boolean().optional(),
  switchInput: z.boolean().optional(),
  
  // Date Inputs
  dateInput: z.string().optional(),
  datetimeInput: z.string().optional(),
  
  // Text Area
  textAreaInput: z.string().optional(),
  
  // Other
  colorInput: z.string().optional(),
  ratingInput: z.number().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const sampleOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export default function InputsPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textInput: "",
      emailInput: "",
      passwordInput: "",
      numberInput: 0,
      checkboxInput: false,
      switchInput: false,
      colorInput: "#3B82F6",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success("Form submitted successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Input Fields Showcase</h1>
        <p className="text-muted-foreground">
          All available input field types from AppInputFields component
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="selection">Selection</TabsTrigger>
              <TabsTrigger value="boolean">Boolean</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            {/* Basic Inputs */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Input Fields</CardTitle>
                  <CardDescription>Text, Email, Password, Number, Phone</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <InputField
                    name="textInput"
                    label="Text Input"
                    type="text"
                    placeholder="Enter text..."
                    required
                  />
                  
                  <InputField
                    name="emailInput"
                    label="Email Input"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                  
                  <InputField
                    name="passwordInput"
                    label="Password Input"
                    type="password"
                    placeholder="Enter password..."
                    required
                  />
                  
                  <InputField
                    name="numberInput"
                    label="Number Input"
                    type="number"
                    placeholder="Enter number..."
                    min={0}
                    max={100}
                    step={1}
                  />
                  
                  <InputField
                    name="phoneInput"
                    label="Phone Input"
                    type="phone"
                    placeholder="+1 (555) 000-0000"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Selection Inputs */}
            <TabsContent value="selection" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selection Input Fields</CardTitle>
                  <CardDescription>Select, Multi-Select, Radio</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <InputField
                    name="selectInput"
                    label="Select Input"
                    type="select"
                    placeholder="Choose an option..."
                    options={sampleOptions}
                    isSearchable={true}
                  />
                  
                  <InputField
                    name="multiSelectInput"
                    label="Multi-Select Input"
                    type="multiSelect"
                    placeholder="Choose multiple options..."
                    options={sampleOptions}
                  />
                  
                  <InputField
                    name="radioInput"
                    label="Radio Input"
                    type="radio"
                    options={sampleOptions}
                  />
                  
                  <InputField
                    name="yesNoRadio"
                    label="Yes/No Radio"
                    type="yes_no_radio"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Boolean Inputs */}
            <TabsContent value="boolean" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Boolean Input Fields</CardTitle>
                  <CardDescription>Checkbox, Switch</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <InputField
                    name="checkboxInput"
                    label="Checkbox Input"
                    type="checkbox"
                    description="This is a checkbox field"
                  />
                  
                  <InputField
                    name="switchInput"
                    label="Switch Input"
                    type="switch"
                    description="Toggle this switch"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Inputs */}
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Input Fields</CardTitle>
                  <CardDescription>Date, DateTime, TextArea, Color, Rating</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                  <InputField
                    name="dateInput"
                    label="Date Input"
                    type="date"
                    placeholder="Select a date..."
                  />
                  
                  <InputField
                    name="datetimeInput"
                    label="DateTime Input"
                    type="datetime-local"
                    placeholder="Select date and time..."
                  />
                  
                  <div className="md:col-span-2">
                    <InputField
                      name="textAreaInput"
                      label="Text Area Input"
                      type="text-area"
                      placeholder="Enter long text..."
                    />
                  </div>
                  
                  <InputField
                    name="colorInput"
                    label="Color Picker"
                    type="color-picker"
                    description="Choose a color"
                  />
                  
                  <InputField
                    name="ratingInput"
                    label="Rating Input"
                    type="rating"
                    description="Rate from 1 to 5"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset
            </Button>
            <Button type="submit">Submit Form</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
