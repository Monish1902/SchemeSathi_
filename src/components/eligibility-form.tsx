'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import {
  recommendSchemes,
  RecommendSchemesInput,
  RecommendSchemesOutput,
} from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';
import { Progress } from './ui/progress';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  age: z.coerce.number().min(1, { message: 'Age is required.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required.',
  }),
  annualIncome: z.coerce.number().min(0, { message: 'Annual income is required.' }),
  familySize: z.coerce.number().min(1, { message: 'Family size is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  disability: z.boolean().default(false),
  occupation: z.string().min(1, { message: 'Occupation is required.' }),
});

export function EligibilityForm() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendSchemesOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 18,
      gender: 'male',
      annualIncome: 50000,
      familySize: 4,
      location: 'Urban',
      category: 'General',
      disability: false,
      occupation: 'Student',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setRecommendations(null);
    try {
      const result = await recommendSchemes(values as RecommendSchemesInput);
      setRecommendations(result);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get scheme recommendations. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  if (recommendations) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Recommended Schemes</h2>
            <Button variant="outline" onClick={() => setRecommendations(null)}>
                Start Over
            </Button>
        </div>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{rec.schemeName}</CardTitle>
                    <CardDescription className="pt-2">{rec.reasoning}</CardDescription>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-24">
                    <span className="font-bold text-lg text-primary">{rec.matchScore}%</span>
                    <Progress value={rec.matchScore} className="h-2" />
                    <span className="text-xs text-muted-foreground">Match Score</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eligibility Details</CardTitle>
        <CardDescription>
          Fill in your details to get personalized scheme recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Your age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Income (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="familySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Family Size</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Number of family members" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Farmer, Student" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your location type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Urban">Urban</SelectItem>
                        <SelectItem value="Rural">Rural</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="OBC">OBC</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="ST">ST</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="disability"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Disability</FormLabel>
                      <FormDescription>
                        Do you have any physical disabilities?
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Schemes...
                </>
              ) : (
                'Find My Schemes'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
