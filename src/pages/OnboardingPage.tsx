import { PageTitle } from '@/components/common/PageTitle'

export function OnboardingPage() {
  return (
    <>
      <div className="px-3 py-6">
        <PageTitle title="Registration Verification (KYC)" />
        <section className="bg-[#1a1a1a] p-4 rounded-2xl mt-5 flex flex-col">
          <div className="max-w-max bg-clip-text text-transparent text-xl font-semibold bg-linear-to-r from-[#EEEEEE] to-[#FFC615]">
            Personal information
          </div>
          <form
            action=""
            className="flex flex-col items-stretch mt-5 gap-6"
            autoComplete="off"
            spellCheck={false}
          >
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-3.5">
                <label
                  htmlFor=""
                  className="text-base font-semibold text-white"
                >
                  <span className="text-[#FF0000] mr-1">*</span>
                  First name
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="bg-black/10 rounded-xl border border-white/40 h-10.5 px-4 text-sm placeholder:text-white/40"
                />
              </div>
              <div className="flex flex-col gap-3.5">
                <label
                  htmlFor=""
                  className="text-base font-semibold text-white"
                >
                  <span className="text-[#FF0000] mr-1">*</span>
                  Last name
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="bg-black/10 rounded-xl border border-white/40 h-10.5 px-4 text-sm placeholder:text-white/40"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3.5">
              <label htmlFor="" className="text-base font-semibold text-white">
                <span className="text-[#FF0000] mr-1">*</span>
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                name=""
                id=""
                className="bg-black/10 rounded-xl border border-white/40 h-10.5 px-4 text-sm placeholder:text-white/40"
              />
            </div>
            <div className="flex flex-col gap-3.5">
              <label htmlFor="" className="text-base font-semibold text-white">
                <span className="text-[#FF0000] mr-1">*</span>
                Upload ID photo
              </label>
              <div className="grid grid-cols-2 gap-2.5"></div>
            </div>
            <button
              type="button"
              className="cursor-pointer w-full h-12 rounded-2xl bg-linear-to-r from-[#FEFE00] to-[#CF4F00] text-[#090E11] text-base font-semibold"
            >
              下一步
            </button>
          </form>
        </section>
      </div>
    </>
  )
}
