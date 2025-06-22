import React from 'react'
import CompanionForm from "@/components/CompanionForm";
import { auth } from '@clerk/nextjs/server'
import {redirect} from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { newCompanionPermissions } from '@/lib/actions/companion.actions';

const NewCompanion = async () => {
    const { userId } = await auth();
    if(!userId) redirect('/sign-in');

    const canCreateCompanion = await newCompanionPermissions();

    return (
        <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
            {
                canCreateCompanion ? (
                    <article className='w-full gap-4 flex flex-col'>
                        <h1>Companion Builder</h1>
                        <CompanionForm />
                    </article>
                )  : (
                    <article className='companion-limit'>
                        <Image
                            src="/icons/companion-limit.svg"
                            alt="Companion limit reached"
                            width={360}
                            height={230}
                        />
                        <div className='cta-badge'>
                            Upgrade your plan
                        </div>
                        <h1>You have reached your limit.</h1>
                        <p>You have reached your limit. To create more companions and access premium features, please upgrade your plan.</p>
                        <Link href="/subscription" className='btn-primary w-full justify-center'>Upgrade My Plan</Link>
                    </article>
                )
            }
        </main>
    )
}
export default NewCompanion
