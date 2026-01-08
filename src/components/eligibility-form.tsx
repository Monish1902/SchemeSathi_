
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
import { useEffect, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2 } from 'lucide-react';
import { recommendSchemes } from '@/ai/flows/recommend-schemes-based-on-eligibility';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { saveUserProfile, getUserProfile } from '@/lib/user-profile-service';

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  age: z.coerce.number().min(1, { message: 'Age is required.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required.',
  }),
  annualIncome: z.coerce.number().min(0, { message: 'Annual income is required.' }),
  familySize: z.coerce.number().min(1, { message: 'Family size is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
  disability: z.boolean().default(false),
  occupation: z.enum(['student', 'employed', 'unemployed', 'farmer', 'driver', 'weaver', 'daily worker', 'other'], { required_error: 'Occupation is required.' }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export function EligibilityForm() {
  const [loading, setLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: 30,
      gender: 'male',
      annualIncome: 50000,
      familySize: 4,
      location: 'Urban',
      category: 'General',
      disability: false,
      occupation: 'student',
    },
  });

  const loadProfile = useCallback(async () => {
    if (user && firestore) {
      setIsProfileLoading(true);
      try {
        const profile = await getUserProfile(firestore, user.uid);
        if (profile) {
          form.reset(profile);
          toast({
            title: 'Profile Loaded',
            description: 'Your saved information has been loaded.',
          });
        } else if (user.displayName) {
          // If no profile, but user has a display name, pre-fill it.
          form.setValue('name', user.displayName);
        }
      } catch (error) {
        console.error("Could not load user profile from Firestore", error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not load your profile.',
        });
      } finally {
        setIsProfileLoading(false);
      }
    } else {
        setIsProfileLoading(false);
    }
  }, [user, firestore, form, toast]);


  useEffect(() => {
    loadProfile();
  }, [loadProfile]);


  async function onSubmit(values: FormSchemaType) {
    if (!user || !firestore) {
       toast({
        variant: 'destructive',
        title: 'Not signed in',
        description: 'You must be signed in to save your profile.',
      });
      return;
    }
    setLoading(true);
    try {
      // 1. Save profile to Firestore
      await saveUserProfile(firestore, user.uid, values);

      toast({
        title: 'Profile Saved!',
        description: 'Your information has been saved to your account.',
      });

      // 2. Fetch recommendations from AI, but handle failure gracefully
      try {
        const recommendations = await recommendSchemes(values);
        // 3. Save recommendations to localStorage on success
        localStorage.setItem('schemeRecommendations', JSON.stringify(recommendations));
        toast({
          title: 'Recommendations Updated!',
          description: 'New scheme recommendations are available for you.',
        });
      } catch (aiError) {
        console.error('AI recommendation error:', aiError);
        // Inform the user but don't block the flow
        toast({
          variant: 'destructive',
          title: 'AI Assistant Error',
          description: 'Could not fetch scheme recommendations. Please ensure your API key is valid. Your profile was saved.',
          duration: 9000,
        });
      }
      
      // 4. Always redirect to the dashboard after attempting AI call
      router.push('/dashboard');

    } catch (error) {
      console.error('An error occurred during profile save:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem saving your profile.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  if (isProfileLoading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Information</CardTitle>
                 <CardDescription>
                    Loading your profile...
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
        <CardDescription>
          Keep your details up-to-date to receive the best scheme recommendations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                        <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                            <SelectValue placeholder="Select your occupation" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="unemployed">Unemployed</SelectItem>
                            <SelectItem value="farmer">Farmer</SelectItem>
                            <SelectItem value="driver">Driver</SelectItem>
                            <SelectItem value="weaver">Weaver</SelectItem>
                            <SelectItem value="daily worker">Daily Worker</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                    <Select onValueChange={field.onChange} value={field.value}>
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
                        value={field.value}
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-1 md:col-span-2">
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

            <Button type="submit" disabled={loading || !user} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Profile & Find Schemes'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
