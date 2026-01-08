
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { andhraPradeshData, districts as apDistricts } from '@/lib/locations';

// This schema now matches the fields from the OLD UserProfile to maintain form compatibility
// The mapping to the NEW UserProfile happens in the saveUserProfile service
export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  age: z.coerce.number().min(1, { message: 'Age is required.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required.',
  }),
  annualIncome: z.coerce.number().min(0, { message: 'Annual income is required.' }),
  familySize: z.coerce.number().min(1, { message: 'Family size is required.' }),
  location: z.enum(['Urban', 'Rural'], { required_error: 'Location type is required.'}),
  district: z.string().min(1, { message: 'District is required.' }),
  mandal: z.string().min(1, { message: 'Mandal is required.' }),
  category: z.enum(['SC', 'ST', 'BC', 'EBC', 'Minority', 'Brahmin', 'EWS', 'General'], { required_error: 'Category is required.' }),
  disability: z.boolean().default(false),
  occupation: z.enum(['student', 'employed', 'unemployed', 'farmer', 'driver', 'weaver', 'daily worker', 'other', 'fisherman', 'housewife'], { required_error: 'Occupation is required.' }),
  landHolding: z.string().optional(),
  vehiclesOwned: z.boolean().default(false).describe('Whether the user owns a four-wheeler vehicle.'),
  houseType: z.enum(['owned', 'rented', 'none'], { required_error: 'House ownership status is required.' }),
  educationQualification: z.enum(['uneducated', '1-10', 'inter', 'bachelors', 'masters'], { required_error: 'Education qualification is required.' }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

const formatIndianNumber = (num: number | string) => {
  const str = num.toString();
  const lastThree = str.substring(str.length - 3);
  const otherNumbers = str.substring(0, str.length - 3);
  if (otherNumbers !== '') {
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return lastThree;
};


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
      age: 0,
      annualIncome: 0,
      familySize: 1,
      district: '',
      mandal: '',
      landHolding: '',
      disability: false,
      vehiclesOwned: false,
    },
  });

  const selectedDistrict = form.watch('district');

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
      // The saveUserProfile service now handles mapping to the new structure
      await saveUserProfile(firestore, user.uid, values);

      toast({
        title: 'Profile Saved!',
        description: 'Your information has been saved to your account.',
      });

      try {
        const recommendations = await recommendSchemes(values);
        localStorage.setItem('schemeRecommendations', JSON.stringify(recommendations));
        toast({
          title: 'Recommendations Updated!',
          description: 'New scheme recommendations are available for you.',
        });
      } catch (aiError) {
        console.error('AI recommendation error:', aiError);
        toast({
          variant: 'destructive',
          title: 'AI Assistant Error',
          description: "Could not fetch AI recommendations at this time. Your profile was still saved successfully.",
          duration: 9000,
        });
      }
      
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Accordion type="multiple" defaultValue={['personal-info', 'financial-info', 'educational-info']} className="w-full">
              {/* Personal Information Section */}
              <AccordionItem value="personal-info">
                <AccordionTrigger className="text-lg font-semibold">Personal Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
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
                           <FormDescription>
                            e.g., 18-59, 60+ (pensions), 8-21 (student)
                          </FormDescription>
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
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Type</FormLabel>
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
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              form.setValue('mandal', ''); // Reset mandal when district changes
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your district" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {apDistricts.map((district) => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mandal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mandal</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDistrict}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your mandal" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectedDistrict && andhraPradeshData[selectedDistrict as keyof typeof andhraPradeshData]?.map((mandal) => (
                                <SelectItem key={mandal} value={mandal}>
                                  {mandal}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                           <FormDescription>
                            Select a district first.
                          </FormDescription>
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
                                <SelectItem value="SC">SC</SelectItem>
                                <SelectItem value="ST">ST</SelectItem>
                                <SelectItem value="BC">BC</SelectItem>
                                <SelectItem value="EBC">EBC</SelectItem>
                                <SelectItem value="Minority">Minority</SelectItem>
                                <SelectItem value="Brahmin">Brahmin</SelectItem>
                                <SelectItem value="EWS">EWS</SelectItem>
                                <SelectItem value="General">General</SelectItem>
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
                           <FormDescription>Note if a scheme is women-headed priority.</FormDescription>
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
                </AccordionContent>
              </AccordionItem>

              {/* Financial Information Section */}
              <AccordionItem value="financial-info">
                <AccordionTrigger className="text-lg font-semibold">Financial Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <FormField
                      control={form.control}
                      name="annualIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Family Income (₹)</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="e.g., 1,00,000"
                              {...field}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(/,/g, '');
                                if (/^\d*$/.test(rawValue)) {
                                  const numValue = Number(rawValue);
                                  field.onChange(numValue); // Update form state with number
                                }
                              }}
                              value={field.value > 0 ? formatIndianNumber(field.value) : ''}
                            />
                          </FormControl>
                          <FormDescription>
                            e.g., &lt; ₹1,20,000 (1.2 Lakh), &lt; ₹2,50,000 (2.5 Lakh).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                        control={form.control}
                        name="landHolding"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Land Holding (in Acres)</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your land holding size" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="0">No land</SelectItem>
                                    <SelectItem value="0-3 wet">0-3 acres (Wet)</SelectItem>
                                    <SelectItem value="0-10 dry">0-10 acres (Dry)</SelectItem>
                                    <SelectItem value="0-25 mixed">0-25 acres (Mixed)</SelectItem>
                                    <SelectItem value=">25">More than 25 acres</SelectItem>
                                </SelectContent>
                            </Select>
                             <FormDescription>e.g., 0-3 acres wet, 0-10 acres dry.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                     <FormField
                      control={form.control}
                      name="houseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>House Ownership</FormLabel>
                           <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your house ownership status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="owned">Owned</SelectItem>
                                <SelectItem value="rented">Rented</SelectItem>
                                <SelectItem value="none">No House</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehiclesOwned"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Own a 4-Wheeler</FormLabel>
                            <FormDescription>
                              Do you or your family own a four-wheeler vehicle?
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              {/* Educational & Professional Section */}
              <AccordionItem value="educational-info">
                <AccordionTrigger className="text-lg font-semibold">Professional & Educational Information</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
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
                                  <SelectItem value="fisherman">Fisherman</SelectItem>
                                  <SelectItem value="housewife">Housewife</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="educationQualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education Qualification</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                  <SelectTrigger>
                                  <SelectValue placeholder="Select your education level" />
                                  </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                  <SelectItem value="uneducated">Uneducated</SelectItem>
                                  <SelectItem value="1-10">1st to 10th</SelectItem>
                                  <SelectItem value="inter">Intermediate</SelectItem>
                                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                  <SelectItem value="masters">Master's Degree</SelectItem>
                              </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button type="submit" disabled={loading || !user} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 mt-8">
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
